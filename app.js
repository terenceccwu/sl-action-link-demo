const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/task', (req, res) => {
  res.send(req.query.id);
})

app.post('/open_task_url', (req, res) => {
  res.json({
    actions: [
      { type: 'OPEN_TASK_URL', task: { id: '123' } }
    ]
  })
})

app.post('/noitify_success', (req, res) => {
  const ids = req.body.ids;

  res.json({
    actions: [
      {
        type: 'NOTIFY',
        message: {
          title_translations: {
            'en': `Successfully processed ${ids?.length || 0} record(s).`,
            'zh-hant': `已提交${ids?.length || 0}筆訂單`,
          },
          description_translations: {
            'en': 'The result will be sent by email soon.',
            'zh-hant': '結果將會發送到郵箱。'
          },
          type: 'success',
        }
      }
    ]
  })
})

app.post('/noitify_error', (req, res) => {
  res.json({
    actions: [
      {
        type: 'NOTIFY',
        message: {
          title_translations: {
            'en': `No permission`,
            'zh-hant': '沒有權限'
          },
          description_translations: {
            'en': `Please open the app page once before using this function.`,
            'zh-hant': `請用使用此功能前，先打開APP頁面一次。`,
          },
          type: 'error',
        }
      }
    ]
  })
})

app.post('/notify_success_and_open_task_url', (req, res) => {
  res.json({
    actions: [
      {
        type: 'NOTIFY',
        message: {
          title_translations: {
            'en': `Please continue the action on the App page`,
            'zh-hant': `請在APP頁面繼續操作`,
          },
          type: 'success',
        }
      },
      { type: 'OPEN_TASK_URL', task: { id: '123' } }
    ]
  })
})

app.post('/notify_success_and_reload_page', (req, res) => {
  const ids = req.body.ids;

  res.json({
    actions: [
      {
        type: 'NOTIFY',
        message: {
          title_translations: {
            'en': `Successfully processed ${ids?.length || 0} record(s).`,
            'zh-hant': `已提交${ids?.length || 0}筆訂單`,
          },
          description_translations: {
            'en': 'The result will be sent by email soon.',
            'zh-hant': '結果將會發送到郵箱。'
          },
          type: 'success',
        }
      },
      { type: 'RELOAD_PAGE' }
    ]
  })
})

app.post('/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      actions: [
        {
          type: 'NOTIFY',
          message: {
            title_translations: {
              'en': `Did not handle timeout`,
              'zh-hant': `沒有處理超時`,
            },
            type: 'success',
          }
        }
      ]
    })
  }, 3000)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
