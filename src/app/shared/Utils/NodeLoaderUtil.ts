export class NodeLoaderUtil {
  public static loadJsFile(url: string, document: Document): void {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public static loadCSSFile(url: string, document: Document): void {
    let node = document.createElement('link');
    node.href = url;
    node.rel='stylesheet';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public static loadJSFiles(paths: string[], document: Document): void {
    for(let path of paths) {
      this.loadJsFile(path, document);
    }
  }

  public static loadCSSFiles(paths: string[], document: Document) {
    for(let path of paths) {
      this.loadCSSFile(path, document);
    }
  }
}
