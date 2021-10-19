export class NodeLoaderUtil {
  public loadJsFile(url: string, document: Document) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public loadCSSFile(url: string, document: Document) {
    let node = document.createElement('link');
    node.href = url;
    node.rel='stylesheet';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
