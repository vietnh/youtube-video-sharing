import { Container } from "inversify";
import { IVideoController, VideoController } from "./controllers/videosController";
import { IYoutubeService, YoutubeService } from "./services/youtubeService";
import Types from "./types";
import { AuthenticationController, IAuthenticationController } from "./controllers/authenticationController";

const container = new Container();
container.bind<IYoutubeService>(Types.YoutubeService).to(YoutubeService).inSingletonScope();

container.bind<IAuthenticationController>(Types.AuthenticationController).to(AuthenticationController);
container.bind<IVideoController>(Types.VideoController).to(VideoController);

export default container;