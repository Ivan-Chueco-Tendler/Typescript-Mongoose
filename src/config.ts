import dotenv from 'dotenv'
dotenv.config()

interface ENV {
  PORT: number | undefined
  MONGO_URI: string | undefined
}

interface Config {
  PORT: number
  MONGO_URI: string
}

const getConfig = (): ENV => {
  return {
    PORT: typeof process.env.PORT === 'string' ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI
  }
}

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`)
    }
  }
  return config as Config
}

const config = getConfig()

const sanitizedConfig = getSanitzedConfig(config)

export default sanitizedConfig
