import './style.css'
import { DashboardEvent, LookerEmbedDashboard, LookerEmbedSDK } from '@looker/embed-sdk'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="embed-dashboard" class="embed-dashboard">
  </div>
`

const dashboardId = '577'
/**
 * Ensure front-end URI (e.g. http://localhost:5173) is added to
 * Looker Admin > Embed > Embedded Domain Allowlist to allow JS events to work
 * cross-domain.
 */
LookerEmbedSDK.init('dev.looker.rbobrowski.com', 'http://localhost:3001/api/signed-url-for-embed')
LookerEmbedSDK.createDashboardWithId(dashboardId)
  .withNext()
  .withTheme('minimal')
  .appendTo('#embed-dashboard')
  .on('dashboard:run:complete', (event: DashboardEvent) => {
    // do something
    console.log(event)
  })
  .on('dashboard:filters:changed', (event: DashboardEvent) => {
    // do something
    console.log(event)
  })

  .build()
  .connect()
  .then((dashboard: LookerEmbedDashboard) => {
    // do something
    console.log(dashboard)
  })
  .catch((error) => {
    console.log(error)
  })
