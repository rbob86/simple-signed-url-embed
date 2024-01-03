import express, { Request, Response } from 'express'
import { IEmbedSsoParams } from '@looker/sdk'
import cors from 'cors'
import { LookerNodeSDK } from '@looker/sdk-node'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
const port = 3001
const sdk = LookerNodeSDK.init40()

app.get('/api/signed-url-for-embed', async (req: Request, res: Response) => {
  const src = req.query.src as string
  const params: IEmbedSsoParams = {
    target_url: `${process.env.LOOKERSDK_BASE_URL}${src}`,
    session_length: 3600,
    force_logout_login: true,
    external_user_id: 'embed-user-1',
    first_name: 'John',
    last_name: 'Smith',
    permissions: [
      'access_data',
      'see_user_dashboards',
      // 'explore',
      // 'download_without_limit',
      // 'see_lookml_dashboards',
      // 'see_looks',
      // 'create_table_calculations',
      // 'save_content',
      // 'create_public_looks',
      // 'download_with_limit',
      // 'schedule_look_emails',
      // 'schedule_external_look_emails',
      // 'create_alerts',
      // 'follow_alerts',
      // 'send_to_s3',
      // 'send_to_sftp',
      // 'send_outgoing_webhook',
      // 'send_to_integration',
      // 'see_sql',
      // 'see_lookml',
      // 'develop',
      // 'deploy',
      // 'support_access_toggle',
      // 'use_sql_runner',
      // 'clear_cache_refresh',
      // 'see_drill_overlay',
      // 'manage_spaces',
      // 'manage_homepage',
      // 'manage_models',
      // 'create_prefetches',
      // 'login_special_email',
      // 'embed_browse_spaces',
      // 'embed_save_shared_space',
      // 'see_alerts',
      // 'see_queries',
      // 'see_logs',
      // 'see_users',
      // 'sudo',
      // 'see_schedules',
      // 'see_pdts',
      // 'see_datagroups',
      // 'update_datagroups',
      // 'see_system_activity',
      // 'mobile_app_access',
    ],
    models: ['geo-test'],
    user_attributes: { locale: 'en_US' },
    // group_ids: [],
    // external_group_id: 'embed_group1',
    // user_timezone?: string;
  }
  const signedUrl = await sdk.ok(sdk.create_sso_embed_url(params))

  res.json(signedUrl)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
