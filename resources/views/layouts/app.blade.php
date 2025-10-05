<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <x-header /> 
    </head>
    <body class="m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
      <!-- Loading Component -->
      <livewire:components.loading />
      
      <!-- sidenav  -->
      <x-sidebar />
      <!-- end sidenav -->

      <main class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <!-- Navbar -->
       <livewire:components.navbar />
        <!-- end Navbar -->

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
         <!-- javascript -->
            <x-javascript />
         <!-- end javascript -->
    </body>
</html>

   