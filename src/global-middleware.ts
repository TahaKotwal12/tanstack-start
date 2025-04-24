import { registerGlobalMiddleware } from '@tanstack/react-start'
import { logMiddleware } from './middleware/loggingMiddleware'

registerGlobalMiddleware({
  middleware: [logMiddleware],
})
