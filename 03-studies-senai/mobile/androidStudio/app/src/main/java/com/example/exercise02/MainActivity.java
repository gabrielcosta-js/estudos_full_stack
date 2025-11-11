package com.example.exercise02;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EditText inputNome = findViewById(R.id.edtNome);
        EditText inputSenha = findViewById(R.id.edtsenha);
        Button btnEnviar = findViewById(R.id.btnEnviar);

        TextView textNome = findViewById(R.id.textRecebeNome);
        TextView textSenha = findViewById(R.id.textRecebeSenha);

        btnEnviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String nome = inputNome.getText().toString();
                String senha = inputSenha.getText().toString();

                if (nome.isEmpty()){
                      Toast.makeText(MainActivity.this,"Digite seu nome " + nome, Toast.LENGTH_SHORT).show();
                        return;
                }

                textNome.setText(inputNome.getText().toString());
                textSenha.setText(inputSenha.getText().toString());

//                Intent intent = new Intent(MainActivity.this, SegundaTela.class);
//                startActivity(intent);
            }
        });

//        btnLogar.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(MainActivity.this, SegundaTela.class);
//                startActivity(intent);
//            }
//        });

    }
}