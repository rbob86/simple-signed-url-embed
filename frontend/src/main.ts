import "./style.css";
import {
  DashboardEvent,
  // LookEvent,
  LookerEmbedDashboard,
  // LookerEmbedLook,
  LookerEmbedSDK,
} from "@looker/embed-sdk";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="embed-dashboard" class="embed-dashboard">
  </div>
`;

// const instanceUrl = 'dev.looker.rbobrowski.com'
const instanceUrl = "gcpm244.cloud.looker.com";
const dashboardId = "40";
let dashboardRef: LookerEmbedDashboard;
// let lookRef: LookerEmbedLook;

/**
 * Ensure front-end URI (e.g. http://localhost:5173) is added to
 * Looker Admin > Embed > Embedded Domain Allowlist to allow JS events to work
 * cross-domain.
 */
LookerEmbedSDK.init(
  instanceUrl,
  "http://localhost:3001/api/signed-url-for-embed"
);

LookerEmbedSDK.createDashboardWithId(dashboardId)
  .withNext()
  .withTheme("minimal")
  .appendTo("#embed-dashboard")
  .on("dashboard:run:complete", (event: DashboardEvent) => {
    // do something
    console.log(event);

    dashboardRef.updateFilters({
      "Delivery Country": "Canada",
    });

    setTimeout(() => {
      const { options } = event.dashboard;
      const { elements, layouts } = options;

      if (elements && layouts) {
        console.log(elements);
        console.log(layouts);

        elements["71"].title = "Updated Test Title";

        // Call dashboard.setOptions to display only the set of filtered components
        dashboardRef.setOptions({
          layouts,
          elements,
        });
      }
    }, 500);
  })
  .on("dashboard:filters:changed", (event: DashboardEvent) => {
    // do something
    console.log(event);
  })
  .build()
  .connect()
  .then((dashboard: LookerEmbedDashboard) => {
    dashboardRef = dashboard;
  })
  .catch((error) => {
    console.log(error);
  });

// const lookId = 32;

// LookerEmbedSDK.createLookWithId(lookId)
//   .withTheme("minimal")
//   .appendTo("#embed-dashboard")
//   .on("look:run:complete", (event: LookEvent) => {
//     // do something
//     console.log(event);
//   })
//   .build()
//   .connect()
//   .then((look: LookerEmbedLook) => {
//     lookRef = look;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
