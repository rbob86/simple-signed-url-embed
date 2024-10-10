import {
  DashboardEvent,
  // DashboardTileEvent,
  // DashboardTileExploreEvent,
  // DrillMenuEvent,
  // DrillModalExploreEvent,
  // EnvClientDialogEvent,
  // ExploreEvent,
  // LookEvent,
  LookerEmbedSDK,
  // PageChangedEvent,
  // PagePropertiesChangedEvent,
  // SessionStatus,
  // SessionTokenRequest,
} from '@looker/embed-sdk'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="embed-dashboard" class="embed-dashboard">
  </div>
`

const instanceUrl = 'gcpm244.cloud.looker.com'
const dashboardId = '40'

/**
 * Ensure front-end URI (e.g. http://localhost:5173) is added to
 * Looker Admin > Embed > Embedded Domain Allowlist to allow JS events to work
 * cross-domain.
 */
LookerEmbedSDK.init(
  instanceUrl,
  'http://localhost:3001/api/signed-url-for-embed'
)

LookerEmbedSDK.createDashboardWithId(dashboardId)
  .withNext()
  .withTheme('minimal')
  .appendTo('#embed-dashboard')
  .on('dashboard:loaded', (event: DashboardEvent) => {
    console.log(`Dashboard loaded: ${event}`)
  })
  // .on('dashboard:run:start', (event: DashboardEvent) => {})
  // .on('dashboard:run:complete', (event: DashboardEvent) => {})
  // .on('dashboard:run:download', (event: DashboardEvent) => {})
  // .on('dashboard:edit:start', (event: DashboardEvent) => {})
  // .on('dashboard:edit:cancel', (event: DashboardEvent) => {})
  // .on('dashboard:save:complete', (event: DashboardEvent) => {})
  // .on('dashboard:delete:complete', (event: DashboardEvent) => {})
  // .on('dashboard:tile:start', (event: DashboardTileEvent) => {})
  // .on('dashboard:tile:complete', (event: DashboardTileEvent) => {})
  // .on('dashboard:tile:download', (event: DashboardTileEvent) => {})
  // .on('dashboard:tile:explore', (event: DashboardTileExploreEvent) => ({ cancel: true }))
  // .on('dashboard:tile:view', (event: DashboardTileExploreEvent) => ({ cancel: true }))
  // .on('dashboard:filters:changed', (event: DashboardEvent) => {})
  // .on('look:ready', (event: LookEvent) => {})
  // .on('look:run:start', (event: LookEvent) => {})
  // .on('look:run:complete', (event: LookEvent) => {})
  // .on('look:save:complete', (event: LookEvent) => {})
  // .on('look:delete:complete', (event: LookEvent) => {})
  // .on('explore:ready', (event: ExploreEvent) => {})
  // .on('explore:run:start', (event: ExploreEvent) => {})
  // .on('explore:run:complete', (event: ExploreEvent) => {})
  // .on('explore:state:changed', (event: ExploreEvent) => {})
  // .on('drillmenu:click', (event: DrillMenuEvent) => ({ cancel: true }))
  // .on('drillmodal:download', (event: DrillModalExploreEvent) => {})
  // .on('drillmodal:explore', (event: DrillModalExploreEvent) => ({ cancel: true }))
  // .on('page:changed', (event: PageChangedEvent) => {})
  // .on('page:properties:changed', (event: PagePropertiesChangedEvent) => {})
  // .on('session:tokens', (event: SessionTokenRequest) => {})
  // .on('session:status', (event: SessionStatus) => {})
  // .on('env:client:dialog', (event: EnvClientDialogEvent) => {})
  .build()
  .connect()
  .then(() => {
    console.log('Done')
  })
  .catch((error: any) => {
    console.error(error)
  })
