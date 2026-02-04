package gymcam.controller;

import gymcam.service.CameraService;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.StackPane;

public class MainController {

    // Layouts
    @FXML private StackPane rootStack;
    @FXML private GridPane gridLayout;
    @FXML private BorderPane fullScreenLayout;

    // ImageViews
    @FXML private ImageView cameraMain;
    @FXML private ImageView camera2;
    @FXML private ImageView camera3;
    @FXML private ImageView camera4;
    @FXML private ImageView fullScreenView; // ImageView da tela cheia

    @FXML private Label statusLabel;

    // Serviços VLCJ
    private CameraService mainService;
    private CameraService cam2Service;
    private CameraService cam3Service;
    private CameraService cam4Service;

    // Serviço para tela cheia (criado dinamicamente)
    private CameraService fullScreenService;

    // Dados de conexão
    private final String[] ips = {
            "192.168.0.52",  // Index 0
            "192.168.0.35",  // Index 1
            "192.168.0.124", // Index 2
            "192.168.0.179", // Index 3
            "192.168.0.170", // Index 4
            "192.168.0.180"  // Adicionei um 6º IP fictício para evitar erro no botão 6
    };

    private String rtsp(String ip) {
        // Ajuste a senha/usuário conforme sua rede
        return "rtsp://admin:gen91292790@" + ip + ":554/onvif1";
    }


    public MainController() {
        System.out.println("MainController criado com sucesso!");
    }



    @FXML
    public void initialize() {
        System.out.println("Controller carregado com sucesso!");
        try {
            mainService = new CameraService(cameraMain);
            cam2Service = new CameraService(camera2);
            cam3Service = new CameraService(camera3);
            cam4Service = new CameraService(camera4);

            startGridStreams();

        } catch (Throwable t) {
            System.err.println("ERRO AO INICIALIZAR VLC:");
            t.printStackTrace();
        }
    }


    private void startGridStreams() {
        if(ips.length > 0) mainService.play(rtsp(ips[0]));
        if(ips.length > 1) cam2Service.play(rtsp(ips[1]));
        if(ips.length > 2) cam3Service.play(rtsp(ips[2]));
        if(ips.length > 3) cam4Service.play(rtsp(ips[3]));
    }

    private void bindCameraSize(ImageView iv) {
        // Faz a imagem ocupar o espaço da célula do Grid, mantendo aspect ratio
        iv.setPreserveRatio(false); // Se quiser preencher tudo, false. Se quiser barras pretas, true.
        // No GridPane, é melhor deixar o layout gerenciar, mas podemos forçar o redimensionamento:
        iv.fitWidthProperty().bind(((javafx.scene.layout.Region) iv.getParent()).widthProperty());
        iv.fitHeightProperty().bind(((javafx.scene.layout.Region) iv.getParent()).heightProperty());
    }

    // ------------------ AÇÕES DOS BOTÕES ------------------

    @FXML private void focusCamera1() { openFull(ips[0]); }
    @FXML private void focusCamera2() { openFull(ips[1]); }
    @FXML private void focusCamera3() { openFull(ips[2]); }
    @FXML private void focusCamera4() { openFull(ips[3]); }
    @FXML private void focusCamera5() { openFull(ips[4]); }
    @FXML private void focusCamera6() {
        if(ips.length > 5) openFull(ips[5]);
    }

    private void openFull(String ip) {
        // Pausar grid para economizar banda (Opcional, mas recomendado)
        // stopGridStreams();

        gridLayout.setVisible(false);
        fullScreenLayout.setVisible(true);
        fullScreenLayout.toFront();

        // Se já existir um player de tela cheia, limpar
        if (fullScreenService != null) {
            fullScreenService.release();
        }

        // Criar novo player para a tela cheia
        fullScreenService = new CameraService(fullScreenView);
        fullScreenService.play(rtsp(ip));

        statusLabel.setText("Visualizando: " + ip);
    }

    @FXML
    private void returnToGrid() {
        // Parar e destruir player de tela cheia
        if (fullScreenService != null) {
            fullScreenService.release();
            fullScreenService = null;
        }

        fullScreenLayout.setVisible(false);
        gridLayout.setVisible(true);
        statusLabel.setText("Modo Mosaico");

        // Se tiver pausado o grid antes, reinicie aqui
        // startGridStreams();
    }

    /**
     * Chamado pelo Main.java ao fechar o programa
     */
    public void shutdown() {
        if(mainService != null) mainService.release();
        if(cam2Service != null) cam2Service.release();
        if(cam3Service != null) cam3Service.release();
        if(cam4Service != null) cam4Service.release();
        if(fullScreenService != null) fullScreenService.release();
    }
}