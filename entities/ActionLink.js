function fromAirTable(data) {
  return {
    _id: data.id,
    ...data.fields,
    label_translations: data.fields.label_translations ? JSON.parse(data.fields.label_translations) : {},
    created_at: data.createdTime,
  }
}

module.exports = {
  fromAirTable,
}
