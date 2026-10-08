const express = require('express');
const cors = require('cors');
const path = require('path');
const sql = require('mssql/msnodesqlv8');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// MSSQL Configuration with Windows Authentication
const dbConfig = {
  connectionString: 'Driver={ODBC Driver 18 for SQL Server};Server=localhost\\SQLEXPRESS;Database=NBT_Hub_Portal;Trusted_Connection=yes;TrustServerCertificate=yes;'
};

let pool = null;

async function getDbPool() {
  if (!pool) {
    try {
      pool = await new sql.ConnectionPool(dbConfig).connect();
      console.log('✓ Successfully connected to Microsoft SQL Server (NBT_Hub_Portal)');
    } catch (err) {
      console.error('✗ Failed to connect to MSSQL:', err.message);
      pool = null;
      throw err;
    }
  }
  return pool;
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const p = await getDbPool();
    const result = await p.request().query('SELECT DB_NAME() AS dbName, GETDATE() AS serverTime');
    res.json({
      status: 'healthy',
      database: 'connected',
      info: result.recordset[0]
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: err.message
    });
  }
});

// Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, interestedService, projectDetails } = req.body;

  // Basic Validation
  if (!fullName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone number are required.'
    });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const sourceUrl = req.headers['referer'] || req.headers['origin'] || '/';

  try {
    const db = await getDbPool();
    const request = db.request();

    // Use parameterized queries to protect against SQL Injection
    request.input('FullName', sql.NVarChar(150), fullName.trim());
    request.input('EmailAddress', sql.NVarChar(255), email.trim().toLowerCase());
    request.input('PhoneNumber', sql.NVarChar(30), phone.trim());
    request.input('InterestedService', sql.NVarChar(150), interestedService ? interestedService.trim() : null);
    request.input('ProjectDetails', sql.NVarChar(sql.MAX), projectDetails ? projectDetails.trim() : null);
    request.input('IpAddress', sql.VarChar(45), clientIp.toString().substring(0, 45));
    request.input('SourceUrl', sql.NVarChar(500), sourceUrl.substring(0, 500));

    const insertQuery = `
      INSERT INTO dbo.ContactInquiries (
        FullName,
        EmailAddress,
        PhoneNumber,
        InterestedService,
        ProjectDetails,
        IpAddress,
        SourceUrl
      )
      VALUES (
        @FullName,
        @EmailAddress,
        @PhoneNumber,
        @InterestedService,
        @ProjectDetails,
        @IpAddress,
        @SourceUrl
      );
      SELECT SCOPE_IDENTITY() AS InsertedId;
    `;

    const result = await request.query(insertQuery);
    const insertedId = result.recordset && result.recordset[0] ? result.recordset[0].InsertedId : null;

    console.log(`[Contact Submission] Saved inquiry ID #${insertedId} from ${fullName} (${email})`);

    return res.json({
      success: true,
      message: 'Thank you! Your request has been received. Our team will contact you within 2 hours.',
      inquiryId: insertedId
    });
  } catch (err) {
    console.error('Error inserting inquiry into database:', err);
    return res.status(500).json({
      success: false,
      message: 'Database error while saving inquiry. Please try again later.',
      error: err.message
    });
  }
});

// View recent inquiries (Helper endpoint for admin verification)
app.get('/api/inquiries', async (req, res) => {
  try {
    const db = await getDbPool();
    const result = await db.request().query(`
      SELECT TOP 20 
        Id, FullName, EmailAddress, PhoneNumber, InterestedService, 
        ProjectDetails, Status, CreatedAt 
      FROM dbo.ContactInquiries 
      ORDER BY CreatedAt DESC
    `);
    res.json({
      success: true,
      count: result.recordset.length,
      data: result.recordset
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend for any other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server with fallback port if busy
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Navabharath Technologies Server running at: http://localhost:${port}`);
    console.log(`📊 Connected to DB: localhost\\SQLEXPRESS (NBT_Hub_Portal)`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Initial DB connection warmup & launch
getDbPool()
  .then(() => startServer(DEFAULT_PORT))
  .catch((err) => {
    console.warn('Starting server with pending DB reconnect...');
    startServer(DEFAULT_PORT);
  });
