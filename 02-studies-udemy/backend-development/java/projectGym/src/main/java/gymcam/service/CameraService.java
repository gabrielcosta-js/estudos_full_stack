package gymcam.service;

import javafx.application.Platform;
import javafx.scene.image.ImageView;
import javafx.scene.image.PixelFormat;
import javafx.scene.image.WritableImage;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;
import uk.co.caprica.vlcj.player.embedded.EmbeddedMediaPlayer;
import uk.co.caprica.vlcj.player.embedded.videosurface.CallbackVideoSurface;
import uk.co.caprica.vlcj.player.embedded.videosurface.callback.BufferFormat;
import uk.co.caprica.vlcj.player.embedded.videosurface.callback.BufferFormatCallback;
import uk.co.caprica.vlcj.player.embedded.videosurface.callback.RenderCallback;
import uk.co.caprica.vlcj.player.embedded.videosurface.callback.format.RV32BufferFormat;

import java.nio.ByteBuffer;

public class CameraService {

    private final MediaPlayerFactory factory;
    private final EmbeddedMediaPlayer mediaPlayer;

    private WritableImage image;

    public CameraService(ImageView imageView) {

        factory = new MediaPlayerFactory();
        mediaPlayer = factory.mediaPlayers().newEmbeddedMediaPlayer();

        CallbackVideoSurface surface = new CallbackVideoSurface(
                new BufferFormatCallback() {
                    @Override
                    public BufferFormat getBufferFormat(int width, int height) {
                        Platform.runLater(() ->
                                image = new WritableImage(width, height)
                        );
                        return new RV32BufferFormat(width, height);
                    }

                    @Override
                    public void allocatedBuffers(ByteBuffer[] buffers) {
                        // não precisa implementar nada
                    }
                },
                new RenderCallback() {
                    @Override
                    public void display(
                            MediaPlayer mediaPlayer,
                            ByteBuffer[] nativeBuffers,
                            BufferFormat bufferFormat
                    ) {
                        if (image == null) return;

                        Platform.runLater(() -> {
                            image.getPixelWriter().setPixels(
                                    0, 0,
                                    bufferFormat.getWidth(),
                                    bufferFormat.getHeight(),
                                    PixelFormat.getByteBgraPreInstance(),
                                    nativeBuffers[0],
                                    bufferFormat.getPitches()[0]
                            );
                            imageView.setImage(image);
                        });
                    }
                },
                true,
                null   // 👈 ESTE É O PARÂMETRO QUE FALTAVA
        );


        mediaPlayer.videoSurface().set(surface);
    }

    public void play(String rtspUrl) {
        mediaPlayer.media().play(rtspUrl);
    }

    public void stop() {
        mediaPlayer.controls().stop();
    }

    public void release() {
        stop();
        mediaPlayer.release();
        factory.release();
    }
}
