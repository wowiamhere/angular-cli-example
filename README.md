# Angular-cli (Angular 2)- *Jump Start*

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
        - this is the DOM tag to be used in the **`src/index.html`** file where the contents of this component will be displayed ![src/index.html][src/index.html]  
        - every [Angular2] app has a main (root) component  
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
we will restructure the folder hierarchy to match something a little more organized for our purposes.  
The people at [Angular-cli] have given us a great starting point, now it is up to us to get ourselves organized.  
So build a folder directory as such:  

![folder hierarchy][folder hierarchy]

We have transfered each file to it's respective folder but **did not** move `app.module.ts`.  
You must also remember to update each file's *metadata* to reflect the directory change:  

![metadata directory change][metadata directory change]  

if you don't, you'll get a compile error  

![dir compile error][dir compile error]  

## 6. Adding New Functionality  

The template for our `AppComponent` is pretty simple right now  

```
<h1>
  {{title}}
</h1>
```

The double brackets are called **interpolation** and the **title** text represents the **property** discussed earlier from our exported class in  

```
app.component.ts
```  

We will add another *property* with some text and a *function* to our component and a button to our template to toggle the text from the view.  

```
export class AppComponent {
  title: string = 'Angular2';
 
  name: string = 'Newton'

  changeName():void{
    this.name = 'Aristophanes'
  }
  
}

```

**[Typescript annotations]** allows us to put a colon `(:)` after a *property*, *function* or *function argument* to denote it's type. In the case of a *function*, the annotation refers to the expected type the function will return.  
Here is a list of [Typescript types].  

After declaring a new property `name`, the function `changeName()` changes the value of the `name` property using `this` to denote a class member.  The *void* after the `:` refers to the fact that the function will NOT be returning a value.  

```html
<h1>
  {{title}}
</h1>

<h2 (click)=changeName()>
  {{name}}'s Application
</h2>
```

In the template for the component, we added a `<h2>` for the `name` property.  

`(click)=changeName()` is [Angular2]'s [template sintax] called [Event Binding]. Everytime the `<h2>` gets clicked, it changes the `innerHTML` of the element: right there in front of your very eyes!

Now that we have played around a little bit with the component and it's template, let's add a new one and explore other features of [Angular2].  

## 6. A new component

Create a new file in the `src/app/components/` folder called `news.component.ts`.  

```
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

Also, create it's view in `src/app/templates/` folder called 'news.component.html'. 

```
<h2>
  {{title}}
</h2>

```

You WILL NOT see this updated in your browser because we have NOT told [Angular2] where to display it.  
We could display this component in the `src/index.html` file OR we could *embed* it within any other view we choose and turn this component into a **child component** of another component.  

Lets place it within `AppComponent` and turn it into a *parent component* of `NewsComponent`.  
We do this by adding the *component selector property* as an *html tag* wherin `AppComponent` we want it displayed.  

```
<h1>
  {{title}}
</h1>

<h2 (click)=changeName()>
  {{name}}'s Application
</h2>

<news-component></news-component>
```  

You WILL NOT see this updated in your browser yet because it is necessary to LOAD the new component into the application in the `app.module.ts` file  

```
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
Once *imported*, the component has to be included within the `declarations` array of the *module* for it to be available anywhere within the application.  
Now you'll be able to see the updated component within your browser!  

Next up, the first service.  

## 7. Services

Sometimes certain routines have to be repeated over and over, but what is the point of hard coding these into each component!?  
This would bloat the application.  
**Services** are classes that live in their own file and take a [Component Decorator]:  

```
@Injectable()
```  

They can be used within any component by way of [Dependency Injection].
Lets create one for our application.  
The service is going to make an HTTP call to [News API].  It's going to fetch some information and display it within a component.  
We will make use of the [RxJx] library which is one of [Angular2]'s bundle for handling information.  
It consists of [observable]s, [subscription]s and a whole library of very usefull and very cool way of handling information.   
If you thought that Promises were great, you are about to have your shoes knocked off!  

Create a file in **`src/app/services`** like this  

```
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService{
  
}
```  

A service looks somewhat similar to a component.  
The project's service looks like this  

![first service][first service]

After importing the [Component Decorator], we import [Angular2]'s native [http] class which has all verbs available (get, put, delete, etc) and will be **injected** into our service via [dependency injection] to be used to make HTTP calls to, well, anywhere we want!  

The class's constructor is where the [Dependency Injection] is gonna take place.

```
constructor(private http: Http){} 
```  

Once *Injected*, the [http] capabilities are a available anywhere within the class.
After a few string manipulation to form the proper *api end point*, 
create a function  

```
fetchNews(){
  let result = this.http.get( this.target_url );

  return result;
}
```  
or more straight forward  

```
fetchNews(){
  return this.http.get( this.target_url );
}
```

Once this service is *injected* into any component, `fetchNews()` will be availble within the comopnent to be used to fetch the data from the *api end point*.  
Let's proceed to our `news.component.ts` file to do that.

```
export class NewsComponent {

  constructor(private newsService: NewsService){}

  title:string = "This is the Daily news";
  news_result: Array<any>;

  getTheNews(){
      
    this.newsService.fetchNews().subscribe(r => {
      this.news_result = r.json().articles;
    } );
  }

}
```

# TO BE COMTINUED IN PART II ....




[Angular-cli]: https://cli.angular.io/
[Angular-cli github]: https://github.com/angular/angular-cli
[Angular2]: https://angular.io/docs/ts/latest/guide/
[http]: https://angular.io/docs/ts/latest/api/http/index/Http-class.html
[dependency injection]: https://angular.io/docs/ts/latest/cookbook/dependency-injection.html
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