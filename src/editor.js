export default function(mdHtml, mdSrc, cm, previewNode) {
  function updateResult(cm,obj) {
    console.log(obj)
    var source = cm.getValue()
    console.log(source)
    previewNode.innerHTML = mdHtml.render(source)
  }

  function buildScrollMap(){

  }

  cm.on('change',updateResult)
}