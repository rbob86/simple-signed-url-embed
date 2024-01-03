# Simple SSO Embedding Demo

## Installation

### Frontend

1. `cd frontend`
2. `npm install` to install dependencies
3. `npm run dev` to run frontend
4. In `frontend/src/main.ts`, change dashboardId value to a valid dashboard id in your Looker instance.
5. Ensure frontend URI (e.g. http://localhost:5173) is added to Admin > Embed > Embedded Domain Allowlist in your Looker instance to allow JS events to work cross-domain.

### Backend

1. `cd backend`
2. `npm install` to install dependencies
3. Create **.env** file with the following properties representing API credentials to your Looker instance:

```
LOOKERSDK_API_VERSION=4.0
LOOKERSDK_BASE_URL=[Looker instance url]
LOOKERSDK_CLIENT_ID=[API key]
LOOKERSDK_CLIENT_SECRET=[API secret]
```

1. In `backend/app.ts`, update the params variable in the `/api/signed-url-for-embed` route to match your Looker setup, including the **models** property.
2. `npm run start` to run backend
