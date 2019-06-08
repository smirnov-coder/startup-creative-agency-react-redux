#addin "Cake.Yarn&version=0.4.5"

var target = Argument("target", "Default");
var configuration = Argument("Configuration", "Release");

string solutionFilePath = "../../StartupCreativeAgency.ReactRedux.sln";

Task("Clean")
	.Does(() =>
{
	DotNetCoreClean(solutionFilePath, new DotNetCoreCleanSettings
    {
        Configuration = configuration
    });
	Information("Solution cleaned.");
});

Task("NuGet-Restore")
	.Does(() =>
{
	DotNetCoreRestore(solutionFilePath);
	Information("NuGet packages restored.");
});

Task("Solution-Build")
	.IsDependentOn("Clean")
	.IsDependentOn("NuGet-Restore")
	.IsDependentOn("NodeJS-Restore")
	.IsDependentOn("Bundle-Build")
	.Does(() =>
{
	DotNetCoreBuild(solutionFilePath, new DotNetCoreBuildSettings
    {
        Configuration = configuration,
		NoRestore = true,
		EnvironmentVariables = new Dictionary<string, string>
		{
			["ASPNETCORE_ENVIRONMENT"] = "Production"
		}
    });
	Information("Solution built.");
});

Task("NodeJS-Restore")
	.Does(() =>
{
	Yarn.Install();
	Information("NodeJS packages restored.");
});

Task("Bundle-Build")
	.Does(() => 
{
	Yarn.RunScript("prod");
	Information("Bundle built.");
});

// Опциональный параметр пути к папке для развёртывания приложения. По умолчанию создаётся папка 'publish' в корневой папке решения.
// Пример использования: ./build.ps1 -Target=Build-And-Publish -publish_dir=C:\my_publish_dir
var publishDirectory = Argument("publish_dir", "../../publish");

Task("Publish")
	.Does(() =>
{
	DotNetCorePublish(".", new DotNetCorePublishSettings
	{
		NoBuild = true,
		NoRestore = true,
		Configuration = configuration,
		OutputDirectory = publishDirectory
	});
	var directoriesToDelete = new DirectoryPath[]{
		Directory(System.IO.Path.Combine(publishDirectory, "tools"))
	};
	DeleteDirectories(directoriesToDelete, recursive: true);
	DeleteFile(System.IO.Path.Combine(publishDirectory, "wwwroot", "bundle-report.html"));
	Information("Application published.");
});

Task("Test")
	.Does(() =>
{
	var solution = ParseSolution(solutionFilePath);
	var testProjects = solution.Projects.Where(project => project.Name.Contains("Tests") && project.Name != "Tests.Shared");
	foreach (var project in testProjects)
	{
		Information($"Testing project {project.Name}...");
		DotNetCoreTest(project.Path.ToString(), new DotNetCoreTestSettings
		{
			NoBuild = true,
			NoRestore = true,
			Configuration = configuration
		});
	}
	Information("Tests completed.");
});

Task("Build-And-Test")
	.IsDependentOn("Solution-Build")
	.IsDependentOn("Test");

Task("Build-And-Publish")
	.IsDependentOn("Solution-Build")
	.IsDependentOn("Publish");

Task("Default")
	.IsDependentOn("Solution-Build");

RunTarget(target);
