# Angular-cli (Angular 2)

We are going to jump start a simple [Angular2] application to show how simple and straight forward it is to build a [SPA].  

The folks at [Angular2] have done a great job with the framework.  The framework basically consists of a *Module* which connects *Components*, *Services*, etc...  We will review each part as we go along.  

[Angular-cli] does a great job integrating all you need to jump start an application; it uses [Webpack].  

Lets begin,  

## 1. create a folder for our project

Lets call it `angular-cli-example`  

## 2. open a command line and type  

```
$ ng new angular_cli_example    
```      

This will create the initial source folders and files needed to jump start a project.  
It will also install the some necessary tools ( don't worry about this now. It will all be explained in due time).  

*For a complete list of [Angular-cli] commands, usage and capabilities refer to [Angular-cli github]*  

This is the output you should expect to see on your terminal ![ng new output][ng new output]  

Let's take a quick look at what [Angular-cli]'s generator produces:  

In the **`src/app`** folder, a barebones  

- **app.module.ts**  
    + takes all the different files and connects them to form an [Angular2] application
- **app.component.ts**
    + an [Angular2] application is composed of various components.  This is the **root** component
- **app.component.spec.ts** 
    + for the root component
- **app.component.html** (a view .html)
    + each component has a view file. This one is for the root component
- **app.component.css** (.css)

In the **`src/`** folder, you will find a file  

- **tsconfig.json**
    + this file indicates that this folder, `src/`, is the **root** folder for a [Typescript] project
    + configuration file for [Typescript], which is a superset of Javascript 
    + this file helps translate [Typescript] into Javascript using a [Typescript transpiler]

In the **root** folder, we have  

- **package.json**
    + [NPM's package manager]
    + here you list all the dependencies that you need for your project
- **angular-cli.json**
    + this is where [Angular-cli] picks up it's configuration for the project

As we encounter other files in our project, they will be further discussed.  


## 3. Install dependencies and run

Whan you run `ng new [app-name]`, Angular2 automatically installs NPM packages, so you don't have to run `
$ npm install`  

Now just run  

```
$ ng serve
```

This will start [Angular-cli]'s server and will watch your files as you edit them automatically updating the view in the browser.  
You will see something this in your terminal  

![ng serve output][ng serve output]  

This means that [Angular-cli] has produced the necessary files that will be served.  

Now, open a browser and navigate to `localhost:4200`.  *4200* is the default port [Angular-cli] uses;you can configure this to be something else.  

![ng serve browser test][ng serve browser test]  

The  

```
app works!
```  

text comes from the `app.component.ts` file, and now that we have verified that our app runs, let's make some changes to customize our project.  

## 4. First Edit  

Open this file  

```
angular-cli-example/src/app/app.component.ts
```  

This is our component!  

```typescript

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}


```  

It is written in [Typescript] and it contains:  

- *import statement* 
    + imports the **Component decorator** from [Angular2] core library and marks a class as an [Angular2] component  
    + you must add the **@ (at sign)** in front of it  

The **[Component Decorator]** takes *Metadata* of properties to be used for the component:  

- *selector*  
    +  **< app-root>< /app-root>**  
        - this is the DOM tag that will appear in the main view.
    + it will display all the contents of the .html file that pertains to this component  
    + the contents of the **.html file** can be manipulated from this component file *(app.component.ts)*      
- *templateUrl*  
    + represents the location of the *.html* file (the view) for this component  
- *styleUrls*
    + an *array* of *.css* (style) files for this component  

#### 4.1 The Module  

An [ngModule] brings together all the different parts of the application.  

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```   

It also has **metadata**:  

- declarations
    + an array where we include **All** components that make up **this** particular module  
    + in this case, the exported class in `app.component.ts` file: `AppComponent`  
- imports  
    + an array of all the necessary [Angular2] tools from the native library that will be used by the component, services, etc...  
- providers  
    + an array of all the services we will use
    + services are custom coded routines that will do something within our app  
    + once declared here, we can include the service within any [Angular2] Component via [dependency injection] (we will discuss this further down)  
- bootstrap  
    + an array that defines the components that will be bootstrapped with this module  
    + in this case, our main component `AppComponent` in `app.component.ts`  

The file *exports* the class that will be used to *launch* the application by bootstrapping this root module within the `src/main.ts` file  

```
platformBrowserDynamic().bootstrapModule(AppModule);
```  

*This is a very fast run down just to get us up and running.*  

Now change the  `title` *property* of the exported class to whatever text you would like to see in the browser.  
Because we ran  

```
ng serve
```  

this will automatically update all pertinent files and you will **immeditely** see the result in the browser ... very cool.  

## 5. Restructuring **`src/app`**  

In order to accomodate for the different components, views (.html files), testing, css, etc,  
we will






















[Angular-cli]: https://cli.angular.io/
[Angular-cli github]: https://github.com/angular/angular-cli
[Angular2]: https://angular.io/docs/ts/latest/guide/
[Webpack]: https://webpack.github.io/docs/
[SPA]: https://en.wikipedia.org/wiki/Single-page_application
[Typescript]: https://www.typescriptlang.org/docs/handbook/angular.html
[Typescript transpiler]: https://www.typescriptlang.org/play/
[NPM's package manager]: https://docs.npmjs.com/files/package.json
[Component Decorator]: https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html
[ngModule]: https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html
[dependency injection]: https://angular.io/docs/ts/latest/cookbook/dependency-injection.html

[ng new output]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ng_new_output.png
[ng serve output]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ngServe.png
[ng serve browser test]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ngServeBrowserTest.png