let timeout = function(ms){
  return new Promise(function(resolve,reject){
    setTimeout(resolve,ms)
  })
}

export {
  timeout
}