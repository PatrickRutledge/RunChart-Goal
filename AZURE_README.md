# Azure Deployment

This branch is configured for Azure Static Web Apps deployment.

## Setup Instructions

1. **Create Azure Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new Static Web App
   - Connect to this GitHub repository
   - Select the `azure-deployment` branch
   - Set build details:
     - App location: `/`
     - Output location: `dist`

2. **Configure Repository Secret**:
   - In GitHub, go to Settings > Secrets and variables > Actions
   - Add `AZURE_STATIC_WEB_APPS_API_TOKEN` with the deployment token from Azure

3. **Automatic Deployment**:
   - Any push to this branch will trigger automatic deployment
   - The app will be built using Vite and deployed to Azure

## Build Configuration

The app is configured to:
- Build using `npm run build`
- Output to `dist/` directory
- Serve static files from Azure CDN
- Support SPA routing

## Custom Domain (Optional)

You can configure a custom domain in the Azure portal under Static Web App settings.
