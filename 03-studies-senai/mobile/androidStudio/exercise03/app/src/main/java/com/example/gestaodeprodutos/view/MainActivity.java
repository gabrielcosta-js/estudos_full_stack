package com.example.gestaodeprodutos.view;


import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import android.content.Intent;
import android.os.Bundle;
import android.util.Log;


import com.example.gestaodeprodutos.R;
import com.example.gestaodeprodutos.adapter.ProdutoAdapter;
import com.example.gestaodeprodutos.viewmodel.ProdutoViewModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;


import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {


    private ProdutoViewModel viewModel;
    private ProdutoAdapter adapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        RecyclerView recycler = findViewById(R.id.recyclerProdutos);
        recycler.setLayoutManager(new LinearLayoutManager(this));


        adapter = new ProdutoAdapter(new ArrayList<>());
        recycler.setAdapter(adapter);


        FloatingActionButton fab = findViewById(R.id.fabAddProduto);
        fab.setOnClickListener(v ->
                startActivity(new Intent(this, CadastroProdutoActivity.class))
        );


        // VIEWMODEL
        viewModel = new ViewModelProvider(this).get(ProdutoViewModel.class);
        viewModel.getProdutos().observe(this, produtos -> {
            Log.d("MAIN_DEBUG", "Lista recebida: " + produtos);
            if (produtos != null) adapter.atualizarLista(produtos);
        });


        viewModel.carregarProdutos();
    }
}
