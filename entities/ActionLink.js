function contruct() {
  return {
    _id: '',
    application_id: '',
    page_key: '',
    label_translations: {},
    priority: 100,
    ui_hook_key: '',
    ui_hook_position: '',
    type: '',
    app_url: '',
    task_url: '',
    created_at: '',
    updated_at: '',
  }
}

function fromAirTable(data) {
  const fields = { ...data.fields }

  Object.keys(fields).forEach(key => {
    if (key.startsWith('_')) {
      fields[key] = undefined;
    }
  })

  return {
    ...contruct(),
    _id: data.id,
    ...fields,
    label_translations: fields.label_translations ? JSON.parse(fields.label_translations) : {},
    created_at: data.createdTime,
    updated_at: data.createdTime,
  }
}

module.exports = {
  fromAirTable,
}
