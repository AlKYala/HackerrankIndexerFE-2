export class NodeLoaderUtil {

  private static standardJsFiles: string[] = ["/assets/js/chart.min.js", "/assets/bootstrap/js/bootstrap.min.js","/assets/js/bs-init.js"];
  private static standardCssFiles: string[] = ["/assets/bootstrap/css/bootstrap.min.css", "/assets/fonts/fontawesome-all.min.css",
    "/assets/css/Highlight-Clean.css", "/assets/css/styles.scss"];

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
  /*
  This is for stylesheets and js files that are (almost) always loaded anyway
   */
  public static loadStandardNodes(document: Document){
    this.loadCSSFiles(this.standardCssFiles, document);
    this.loadJSFiles(this.standardJsFiles, document);
  }
}
