package com.example.gestaodeprodutos.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;


import com.example.gestaodeprodutos.model.Produto;
import com.example.gestaodeprodutos.repository.ProdutoRepository;


import java.util.List;
public class ProdutoViewModel extends ViewModel {


    private ProdutoRepository repository;
    private MutableLiveData<List<Produto>> listaProdutos;


    public ProdutoViewModel() {
        repository = new ProdutoRepository();
        listaProdutos = new MutableLiveData<>();
    }


    public LiveData<List<Produto>> getProdutos() {
        return listaProdutos;
    }


    public void carregarProdutos() {
        listaProdutos = repository.listarProdutos();
    }


    public LiveData<Boolean> salvarProduto(String nome, Double preco) {
        Produto p = new Produto(nome, preco);
        System.out.println(p);
        return repository.inserirProduto(p);
    }
}
