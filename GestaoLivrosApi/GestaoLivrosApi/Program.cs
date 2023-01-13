using GestaoLivros.BLL.Services;
using GestaoLivros.DAL.Repositories;
using GestaoLivros.Data;
using GestaoLivros.Infrastructure.Interfaces.Repositories;
using GestaoLivros.Infrastructure.Interfaces.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IBookService, BooksService>();
builder.Services.AddScoped<IBookRepository,BookRepository>();

builder.Services.AddScoped<IAuthorService, AuthorsService>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();

builder.Services.AddDbContext<AppDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();
//Defenir a app react, onde vão ser feitas as requisições:
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});


app.Run();

