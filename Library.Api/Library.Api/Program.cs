using Library.Api.Data;
using Library.Api.Models;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<IBookRepository, InMemoryBookRepository>();
//builder.Services.AddHttpClient<IBookRepository, HttpBookRepository>(c =>
//{
//    c.BaseAddress = new Uri("https://libapi.1breadcrumb.com/api/");
//    // adjust if `/api/` prefix isn’t required
//}); 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();


app.UseSwagger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowReactApp");
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.MapControllers();


app.Run();