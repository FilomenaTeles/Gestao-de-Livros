# Gestao-de-Catalogos-de-Livros

Criar aplicação web para gerir catálogo de livros

   - Ef - vamos ter de ter uma base dados e objetos que tem de ir para bae de dados
   
   - Api - para disponibilizar os dados/ funcionalidades ao frontend
   
   - Git - para fazer commmits…
   
   - React - para frontend
 


**Fase 1**



   Livro - isbn, nome do livro, autor, preço

Como utilizador quero poder pesquisar um livro pelo isbn

Só queremos pesquisar por este campo?
  
   - Ordenação
  
   - Paginação
  
Como utilizador quero poder inserir um livro

 Validações:
 
   - preço não pode ser negativo
   - Nao podemos inserir isbn duplicados…
 
 
Como utilizador quero poder alterar um livro

 Validaçoes:
 
   - iguais ao inserir
 
 
Como utilizador quero poder eliminar um livro

   - Soft delete
 
 
 
**Fase 2**



Autor - id, nome

Livro - isbn, nome do livro, idautor, preço

Como utilizador, quando estou a inserir um livro, quero poder selecionar o autor a partir de uma lista
   
   - Criar a tabela autor, relacionar com tabela livro...
   
   - Alterar api para enviar idautor...
   
   - Alterar frontend para ter dropdown em vez de texto...

