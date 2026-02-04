package gymcam;

import gymcam.controller.MainController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import uk.co.caprica.vlcj.factory.discovery.NativeDiscovery;

public class Main extends Application {

    private MainController controller;

    @Override
    public void start(Stage stage) {
        try {
            System.out.println(">>> START APP");

            boolean found = new NativeDiscovery().discover();
            System.out.println("VLC encontrado: " + found);

            FXMLLoader loader = new FXMLLoader(
                    getClass().getResource("/gymcam/view/main_view.fxml")
            );

            Parent root = loader.load();

            Scene scene = new Scene(root, 1024, 768);
            stage.setScene(scene);
            stage.setTitle("GymCam");
            stage.show();

            System.out.println(">>> STAGE SHOW OK");

        } catch (Throwable t) {   // 🔥 Throwable, não Exception
            System.err.println("🔥 ERRO REAL AO INICIAR:");
            t.printStackTrace();
            System.exit(1);
        }
    }


    public static void main(String[] args) {
        launch(args);
    }
}
