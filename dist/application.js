"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const vault_1 = __importDefault(require("./config/vault"));
const compression_1 = __importDefault(require("compression"));
const error_handler_1 = __importDefault(require("./handlers/error.handler"));
const logging_handler_1 = __importDefault(require("./handlers/logging.handler"));
const database_initializer_1 = __importDefault(require("./initializers/database.initializer"));
const reactRender = require('express-react-views');
class Application {
    constructor(args) {
        this.dbOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        };
        this.app = express_1.default();
        this.loggHandler = new logging_handler_1.default();
        this.errorHandler = new error_handler_1.default(this.loggHandler);
        this.setupExpress();
        this.initializeMiddleware(args.interceptor);
        this.initializeViewControllers(args.viewControllers);
        this.initializeControllers(args.controllers);
        this.initializeErrorHandling(args.interceptor);
        this.connectToTheDatabase(true);
        this.initializeWebjobs();
    }
    startlistening() {
        const port = vault_1.default.host.PORT;
        this.app.listen(port, () => {
            console.log(`Server listening on the port ${port}`);
        });
    }
    setupExpress() {
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(vault_1.default.application.FILE_DIRECTORY));
        this.app.use(express_1.default.static('presentation'));
        this.app.use('/static', express_1.default.static('public'));
        this.app.set('views', 'src/presentation/views');
        this.app.set('view engine', vault_1.default.presentation.vieEngine.type);
    }
    initializeMiddleware(middleware) {
        middleware.getInterceptors().forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.getRoute(), controller.getRouter());
        });
    }
    initializeViewControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.getRoute(), controller.getRouter());
        });
    }
    initializeErrorHandling(middleware) {
        this.app.use(middleware.getNotFoundHandler());
        this.app.use(middleware.getErrorHandler());
    }
    initializeWebjobs() {
        /*const dataCollector = new DataCollectionJob();
  
        dataCollector.scheduleA(scheduler);
        dataCollector.scheduleB(scheduler);
        dataCollector.scheduleC(scheduler);*/
    }
    connectToTheDatabase(createInitialData = false) {
        const dataInitializer = new database_initializer_1.default(this.errorHandler, this.loggHandler);
        const prepend = vault_1.default.databse.DB_PREPEND;
        const userName = vault_1.default.databse.DB_USERNAME;
        const password = vault_1.default.databse.DB_PASSWORD;
        const dbURIPath = vault_1.default.databse.DB_URI_PATH;
        const connectionString = `${prepend}${userName}:${password}${dbURIPath}`;
        mongoose_1.default.connect(connectionString, this.dbOptions);
        mongoose_1.default.connection.once('open', () => __awaiter(this, void 0, void 0, function* () {
            console.log('MongoDB connected successfully');
            if (createInitialData) {
                yield dataInitializer.createInitialRoles();
                yield dataInitializer.createInitialAdministrators();
            }
        }));
    }
}
exports.default = Application;
