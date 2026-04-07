import sql from 'mssql/msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const config: { connectionString: string } = {
  connectionString: `Server=localhost;Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};Connection Timeout=5;`
};                    

export const connectDB = async (): Promise<void> => {
  try {
    console.log('Intentando conectar a SQL Server...');
    await sql.connect(config);
    console.log('Conexión exitosa a SQL Server con Windows Authentication');
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error;
  }
};

export default sql;