const getPool = require('./getPool');

const main = async () => {
	let pool;
	try {
		pool = await getPool();

		console.log('Borrando tablas...');

		await pool.query(
			'DROP TABLE IF EXISTS entryVotes, entryPhotos, entries, users'
		);

		console.log('Creando tablas...');

		//user table
		await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100),
        active BOOLEAN DEFAULT false,
        role ENUM('admin', 'normal') DEFAULT 'normal',
        registrationCode CHAR(30),
        recoverPassCode CHAR(10),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `);

		//entry table
		await pool.query(`
      CREATE TABLE IF NOT EXISTS entries (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        place VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        userId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id)
      )
    `);

		//photos table
		await pool.query(`
      CREATE TABLE IF NOT EXISTS entryPhotos (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        entryId INT UNSIGNED NOT NULL,
        FOREIGN KEY(entryId) REFERENCES entries(id),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

		//votes table
		await pool.query(`
      CREATE TABLE IF NOT EXISTS entryVotes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        value TINYINT UNSIGNED NOT NULL,
        userId INT UNSIGNED NOT NULL,
        entryId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(entryId) REFERENCES entries(id)
      )
    `);

		console.log('tablas creadas!!');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit();
	}
};

main();
