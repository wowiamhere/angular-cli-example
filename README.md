# Angular-cli (Angular 2)- *Jump Start*

<small>Follow at: **<a href="http://zencodemaster.com/coding-post/2" target="_blank">ZenCodeMaster.com**</a></small>

We are going to jump start a simple [Angular2] application to show how straight forward it is to build a [SPA].  

The folks at [Angular2] have done a great job with the framework.  The framework basically consists of a `Module` which connects `Components`, `Services`, etc...  All will reviewed as we proceed.  

[Angular-cli] does a great job integrating all you need to jump start an application; it uses [Webpack].  

Lets begin,  

## 1. Folder for Project

Lets call it `angular-cli-example`  

```
$ mkdir angular-cli-example
```  

## 2. [Angular-cli] generator  

This command will scaffold a squeleton application to build upon.  

```
$ ng new angular_cli_example    
```      

This will create the initial source folders and files needed to jump start a project.  
It will also install some necessary tools that will be reviewed soon.  

*For a complete list of [Angular-cli] commands, usage and capabilities refer to [Angular-cli github]*  

This is the output you should expect to see on your terminal  

![ng new output][ng new output]  


Let's take a quick look at what [Angular-cli]'s generator produces:  

In the **`src/app`** folder, a barebones  

- **app.module.ts**  
    + takes all the different files and connects them to form an [Angular2] application
- **app.component.ts**
    + an [Angular2] application is composed of various components.  This is the **root** component
- **app.component.spec.ts** 
    + test for the root component
- **app.component.html** (a view .html)
    + each component has a view file
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

Other files will be further discussed as necessary.  


## 3. Install Dependencies

[Angular-cli]'s  

```
ng new [app-name]
```  

automatically installs NPM packages, so no need to run  

```
$ npm install
```  

To verify the installation worked run [Angular-cli]'s server  

```
$ ng serve
```

This will start the server and monitor files automatically updating the view in the browser.  
You will see something like this in your terminal  

![ng serve output][ng serve output]  

This means that [Angular-cli] has produced the necessary files that will be served.  

Now, open a browser and navigate to `localhost:4200`.  *4200* is the default port [Angular-cli] uses;you can configure this to be something else.  

![ng serve browser test][ng serve browser test]  

The  

```html
app works!
```  

text comes from the `app.component.ts` file.  


## 4. The Module  

The [ngModule] brings together all the different parts of the application.  

```typescript
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
    + an array of **All** components that make up **this** particular module  
    + in this case, the exported class in `app.component.ts` file: `AppComponent`  
- imports  
    + an array of all necessary [Angular2] tools from the native library that will be used by the component, services, etc...  
- providers  
    + an array of all the services used by the module
    + services are custom coded routines that will do something within our app  
    + once declared here, we can include the service within any [Angular2] Component via [dependency injection] (discussed further down)  
- bootstrap  
    + an array of components to be bootstrapped to this module  
    + thus far, our main component `AppComponent` in `app.component.ts`  

The file `exports` the class that will be used to *launch* the application by bootstrapping this *root module* within the `src/main.ts` file  

```typescript
platformBrowserDynamic().bootstrapModule(AppModule);
```  

*This is a very fast run down just to get us up and running.*  


## 5. First Edit  

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

- `import statement` 
    + imports the `Component` *decorator* from [Angular2] core library and marks a class as an [Angular2] component  
    + you must add the `@` *(at sign)* in front of it  

The **[Component Decorator]** takes *Metadata* to be used for the component:  

- `selector`  
    +  **< app-root>< /app-root>**  
        - this is the DOM tag to be used in the **`src/index.html`** file where the contents of this component will be displayed  
          ![src/index.html][src/index.html]  
        - every [Angular2] app has a main (root) component  
    + it will display all the contents of the .html file that pertains to this component  
    + the contents of the `html` are manipulated from this `app.component.ts` file       
- `templateUrl`  
    + represents the location of the *.html* file (the view) for this component  
- `styleUrls`
    + an *array* of *.css* (style) files for this component  

With [Angular-cli]'s server running, changing the `title` *property* of this exported class automatically updates the browser.... very cool.  


## 6. Restructuring **`src/app`**  

Restructure the folder hierarchy to match something a little more organized for our purposes.  
[Angular-cli] produces a great starting point, but it is up to the developer to get organized.  
A more organized folder directory  

![folder hierarchy][folder hierarchy]

`app.module.ts` **remains** in the same directory.  

You must also remember to update each file's *metadata* to reflect the directory change:  

![metadata directory change][metadata directory change]  

if you don't, you'll get a compilation error  

![dir compile error][dir compile error]  


## 7. Adding New Functionality  

The template for our `AppComponent` is pretty simple right now  

```html
<h1>
  {{title}}
</h1>
```

The double brackets are called **[interpolation]** and the **title** text represents the **property** of the exported class in the component file that renders this `.html` file  

```
src/app/components/app.component.ts
```  

in this case.  

We will add another *property* and a *function* to our component.  To the component's template, a button to toggle the text from the browser.  

```typescript
export class AppComponent {
  title: string = 'Angular2';
 
  name: string = 'Newton'

  changeName():void{
    this.name = 'Aristophanes'
  }
  
}

```

**[Typescript annotations]** denote variable type by placing a colon `(:)` after a *property*, *function* or *function argument*.  In the case of a *function*, the annotation refers to the expected type the function will return.  
Here is a list of [Typescript types].  

After declaring a new property `name`, the function `changeName()` changes the value of the `name` property using `this` to denote a class member.  The *void* after the `:` expects the function NOT to return a value.  

```html
<h1>
  {{title}}
</h1>

<h2 (click)=changeName()>
  {{name}}'s Application
</h2>
```

In the template for the component, we added a `<h2>` for the `name` property.  

```typescript
(click)=changeName()
```  

is [Angular2]'s [template sintax] called [Event Binding]. Everytime the `<h2>` gets clicked, it changes the `innerHTML` of the element.  

Let's add a new component and explore other features of [Angular2].  


## 8. A new component

Create a new file `news.component.ts` in `src/app/components/`.  

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'news-component',
  templateUrl: '../templates/news.component.html',
  styleUrls: [ '../styles/app.component.css']
})

export class NewsComponent {
  title:string = "This is the Daily news";

}
```

Also, create it's view template `news.component.html` in `src/app/templates/`. 

```html
<h2>
  {{title}}
</h2>

```

This component can be displayed in the `src/index.html` file OR within any other view as a **child component**.  
This will NOT be updated in the browser yet because the *new* `NewsComponent` has NOT been wired into [Angular2] yet.  

`AppComponent` becomes a *parent component* of `NewsComponent` by adding the `selector` *property* of `NewsComponent` as an **html tag** within `AppComponent`'s template.  

```html
<h1>
  {{title}}
</h1>

<h2 (click)=changeName()>
  {{name}}'s Application
</h2>

<news-component></news-component>
```  

`NewsComponent` has to be loaded into the *Module*.  In `src/app/app.module.ts` 

```typescript
...

  /* components */
import { AppComponent } from './components/app.component';
import { NewsComponent } from './components/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule

...
```    
Once *imported*, the component has to be included within the `declarations` array of the *Module* for it to be available anywhere within the application.  
Now it's possible to see the updated component at work in the browser!  

Next up, the first service.  

## 9. Services

Sometimes certain routines have to be repeated over and over, but what is the point of hard coding these into each component!?  
This would bloat the application.  
**Services** are classes that live in their own file and take a [Component Decorator]:  

```typescript
@Injectable()
```  

They can be used within any component by way of [Dependency Injection].  
Let's add a service that makes HTTP calls to [News API].  
It's going to fetch some information and display it within a component.  

[RxJs] library is one of [Angular2]'s bundle for handling information.  
It consists of **[observable]s**, **[subscription]s** and a whole library of very usefull and very effective way of handling information.   

Create **`news.service.ts`** in `src/app/services/` like this  

```trypescript
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService{
  
}
```  

A service looks somewhat similar to a component.  
Refractor like this  

```typescript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class NewsService{

  constructor(private http: Http){}

  api_end_point: string = ' https://newsapi.org/v1/articles';
  api_key: string = 'apiKey=e4e2aa62a883464a87547e8de4336f61';
  source: string = 'source=bbc-news';

  target_url: string = this.api_end_point + '?' + this.source + '&' + this.api_key;

  fetchNews(): Response{
    let result = this.http.get( this.target_url );

    return result;
  }

}
```  

This *service*  

- imports the [Component Decorator]
- imports [Angular2]'s native [Http] class which has all verbs available (get, put, delete, etc)
- imports the `Response` class for [Typescript Annotations].  
- the [Http] service is **injected** through the `constructor` via [dependency injection] making it available in the class   
    ```typescript
    constructor(private http: Http){} 
    ```  
- some string manipulation to form the proper *api end point* - notice the [Typescript annotiations]
- `fetchNews(): Response` is a function that makes an [Http] request and returns a `Response Http Object` 
    + `this.http` refers to [Angular2]'s imported [Http] class
    + `.get(url)` is [Http]'s class method that corresponds to an HTTP GET request
    + it's possible to make POST, DELETE, PATCH, PUT, etc requests (more on that soon)



Once this service is *injected* into any component, `fetchNews()` will be availble within it.  


# TO BE COMTINUED IN PART II ....




[Angular-cli]: https://cli.angular.io/
[Angular-cli github]: https://github.com/angular/angular-cli
[Angular2]: https://angular.io/docs/ts/latest/guide/
[Http]: https://angular.io/docs/ts/latest/api/http/index/Http-class.html
[dependency injection]: https://angular.io/docs/ts/latest/cookbook/dependency-injection.html
[interpolation]: https://angular.io/docs/ts/latest/guide/template-syntax.html#!#interpolation
[Event Binding]: https://angular.io/docs/ts/latest/guide/user-input.html#!#click
[template sintax]: https://angular.io/docs/ts/latest/guide/template-syntax.html
[Webpack]: https://webpack.github.io/docs/
[SPA]: https://en.wikipedia.org/wiki/Single-page_application
[Typescript]: https://www.typescriptlang.org/docs/handbook/angular.html
[Typescript transpiler]: https://www.typescriptlang.org/play/
[Typescript annotations]: https://www.typescriptlang.org/docs/tutorial.html#type-annotations
[Typescript types]: https://www.typescriptlang.org/docs/handbook/basic-types.html
[NPM's package manager]: https://docs.npmjs.com/files/package.json
[Component Decorator]: https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html
[ngModule]: https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html
[News API]: https://newsapi.org/#documentation
[RxJx]: http://reactivex.io/rxjs/manual/overview.html
[observable]: http://reactivex.io/rxjs/manual/overview.html#observable
[subscription]: http://reactivex.io/rxjs/manual/overview.html#subscription


[ng new output]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ng_new_output.png
[ng serve output]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ngServe.png
[ng serve browser test]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/ngServeBrowserTest.png
[folder hierarchy]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/folderHierarchy.png
[metadata directory change]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/updateDirs.png
[dir compile error]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/dirCompileError.png
[src/index.html]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/indexHtml.png
[first service]: https://s3-us-west-2.amazonaws.com/zencodemaster/tutorials/angular-cli/firstService.png