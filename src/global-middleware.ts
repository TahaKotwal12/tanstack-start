import { registerGlobalMiddleware } from '@tanstack/react-start'
import { logMiddleware, preLogMiddleware } from './middleware/loggingMiddleware'

registerGlobalMiddleware({
  middleware: [logMiddleware, preLogMiddleware]
})
