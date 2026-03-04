import mongoose, { Connection } from 'mongoose'

// Interface for MongoDB connection state
interface MongoConnectionState {
  isConnected: boolean
  connection: Connection | null
}

// Global connection state to cache the connection
let connectionState: MongoConnectionState = {
  isConnected: false,
  connection: null
}
let connectionPromise: Promise<void> | null = null

/**
 * Connects to MongoDB database using Mongoose
 * Caches the connection to prevent multiple connections in development
 * @returns Promise<void>
 */
export const connectToDB = async (): Promise<void> => {
  // Return existing connection promise if one is in progress
  if (connectionPromise) {
    return connectionPromise
  }

  // Return early if already connected
  if (connectionState.isConnected && connectionState.connection) {
    console.log('MongoDB already connected')
    return
  }

  // Create connection promise
  connectionPromise = (async () => {
    try {
      // Validate environment variable
      const mongoUri = process.env.MONGODB_URI
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not defined')
      }

      // Connect to MongoDB with connection options
      const connection = await mongoose.connect(mongoUri, {
        maxPoolSize: 10, // Maximum number of socket connections
        serverSelectionTimeoutMS: 5000, // How long to try selecting a server
        socketTimeoutMS: 45000, // How long a send or receive on a socket can take
      })

      // Update connection state
      connectionState = {
        isConnected: true,
        connection: connection.connection
      }

      console.log('MongoDB connected successfully')
      
      // Set up connection event listeners
      connection.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
        connectionState.isConnected = false
        connectionState.connection = null
        connectionPromise = null
      })

      connection.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
        connectionState.isConnected = false
        connectionState.connection = null
        connectionPromise = null
      })

    } catch (error) {
      console.error('MongoDB connection error:', error)
      connectionState.isConnected = false
      connectionState.connection = null
      connectionPromise = null
      throw error
    } finally {
      connectionPromise = null
    }
  })()

  return connectionPromise
}

/**
 * Disconnects from MongoDB database
 * @returns Promise<void>
 */
export const disconnectFromDB = async (): Promise<void> => {
  if (!connectionState.isConnected || !connectionState.connection) {
    console.log('MongoDB not connected')
    return
  }

  try {
    await mongoose.disconnect()
    connectionState = {
      isConnected: false,
      connection: null
    }
    console.log('MongoDB disconnected successfully')
  } catch (error) {
    console.error('MongoDB disconnection error:', error)
    throw error
  }
}

/**
 * Gets the current MongoDB connection status
 * @returns boolean - true if connected, false otherwise
 */
export const getConnectionStatus = (): boolean => connectionState.isConnected

/**
 * Gets the current MongoDB connection instance
 * @returns Connection | null - the connection instance or null if not connected
 */
export const getConnection = (): Connection | null => connectionState.connection
