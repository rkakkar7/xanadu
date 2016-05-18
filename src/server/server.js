import Http from 'http';
import Express from 'express';
import Path from 'path';
import IoFunction from 'socket.io';

export default class Server {
  constructor(kwargs = {}) {
    this.expressApp = Express();
    this.httpServer = Http.Server(this.expressApp);
    this.io         = IoFunction(this.httpServer);
    this.port       = kwargs.port || 3000;
    this.sockets    = kwargs.sockets || [];

    this.createServer();

    this.gameNS = this.io.of('/game');

    this.debug = kwargs.debug || true;

    if (this.debug) {
      this.debugNS = this.io.of('/debug');
    }

    this.ns         = kwargs.ns || '/';
    this.maxPlayers = kwargs.maxPlayers || 8;
    this.seed       = kwargs.seed || Date.now();
    //this.rng        = 
    // XXX: do we need a list of players (or rather, sockets?)
  }
  createServer() {
    const PATHS = {
      CLIENT: Path.join(__dirname, '..', 'client'),
      NODE_MODULES: Path.join(__dirname, '..', '..', 'node_modules')
    };
    PATHS.JQUERY = Path.join(PATHS.NODE_MODULES, 'jquery', 'dist');
    PATHS.BOOTSTRAP = Path.join(PATHS.NODE_MODULES, 'bootstrap', 'dist');

    this.expressApp.use(Express.static(PATHS.CLIENT));
    this.expressApp.use('/jquery', PATHS.JQUERY);
    this.expressApp.use('/bootstrap', PATHS.BOOTSTRAP);

    this.httpServer.listen(this.port, () => {
      console.log(`XANADU SERVER listening on port ${ this.port }`);
    });
  }
  addSocket(socket) {
    throw new Error(`TODO: implement 'addSocket' with arg ${ socket.id }`);
  }
}
