import _ from 'lodash'

export const showStatusText = function (response, _this) {
  if (response.statusText) {
    _this.$notify.error({
      title: 'Error al procesar',
      message: response.statusText
    })
  }
}

export const showErrors = function (response, _this) {
  if (response.errors) {
    if (Array.isArray(response.errors)) {
      _.map(response.errors, function (el) {
        _this.$notify.error({
          title: 'Errores al procesar',
          message: el
        })
      })
    } else {
      _this.$notify.error({
        title: 'Ocurrieron errores',
        message: response.errors.message
      })
    }
  } else { // Ocurrieron errores con estructura desconocida
    _this.$notify.error({
      title: 'Ocurrieron errores',
      message: response
    })
  }
} // showErrors
