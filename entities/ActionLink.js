function fromAirTable(data) {
  const fields = { ...data.fields }

  Object.keys(fields).forEach(key => {
    if (key.startsWith('_')) {
      fields[key] = undefined;
    }
  })

  return {
    _id: data.id,
    ...fields,
    label_translations: fields.label_translations ? JSON.parse(fields.label_translations) : {},
    created_at: data.createdTime,
  }
}

module.exports = {
  fromAirTable,
}
