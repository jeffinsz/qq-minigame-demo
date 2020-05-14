export default class ShareCanvas {
  constructor(width, height, times, imgY) {
    this.friendRankShow = false;
    this.openDataContext = qq.getOpenDataContext();
    this.sharedCanvas = this.openDataContext.canvas;
    this.info = qq.getSystemInfoSync();
    this.imgY = imgY || 0;
    this.GAME_WIDTH = this.info.windowWidth * this.info.pixelRatio;
    this.GAME_HEIGHT = this.info.windowHeight * this.info.pixelRatio;

    this.sharedWidth = width || 750;
    this.sharedHeight = height || 800;
    // this.sharedWidth  = this.GAME_WIDTH;
    // this.sharedHeight = this.GAME_HEIGHT;

    this.init(times);
  }

  init(times) {
    // 中间挖了个坑用填充排行榜
    this.sharedCanvas.width = this.sharedWidth;
    this.sharedCanvas.height = this.sharedHeight;

    // 屏幕适配
    const temp = this.sharedHeight / this.sharedWidth;
    // this.sharedWidth  = this.GAME_WIDTH * ( times || 0.85 );
    this.sharedWidth = this.GAME_WIDTH * (times || 1);
    this.sharedHeight = temp * this.sharedWidth;
    // this.sharedWidth  = this.GAME_WIDTH;
    // this.sharedHeight = this.GAME_HEIGHT;

    this.updateSubViewPort(this.sharedWidth, this.sharedHeight);
  }

  updateSubViewPos(imgY) {
    this.imgY = imgY || 0;
    this.updateSubViewPort(this.sharedWidth, this.sharedHeight);
  }

  updateSubViewPort(width, height) {
    // 计算排行榜占据的物理尺寸
    const realWidth = (width / this.GAME_WIDTH) * this.info.windowWidth;
    const realHeight = (height / this.GAME_HEIGHT) * this.info.windowHeight;
    // const realWidth  = width;
    // const realHeight = height;

    this.openDataContext.postMessage({
      event: "updateViewPort",
      box: {
        width: realWidth,
        height: realHeight,
        x: (this.info.windowWidth - realWidth) / 2,
        y:
          this.imgY / this.info.pixelRatio ||
          (this.info.windowHeight - realHeight) / 2
      }
    });
  }

  renderFriendRank(PIXI, app) {
    !this.texture &&
      (this.texture = PIXI.Texture.fromCanvas(this.sharedCanvas));
    this.texture.update();
    const shared = new PIXI.Sprite(this.texture);
    shared.name = "shared";

    shared.width = this.sharedWidth;
    shared.height = this.sharedHeight;

    shared.x = this.GAME_WIDTH / 2 - shared.width / 2;
    shared.y = this.imgY || this.GAME_HEIGHT / 2 - shared.height / 2;

    app.stage.addChild(shared);
  }

  rankTiker(PIXI, app) {
    // 每一帧都先清除子域
    const sub = app.stage.getChildByName("shared");
    sub && app.stage.removeChild(sub);

    // 如果需要展示好友排行榜，将最新的子域绘制出来
    if (this.friendRankShow) {
      this.renderFriendRank(PIXI, app);
    }
  }
}
