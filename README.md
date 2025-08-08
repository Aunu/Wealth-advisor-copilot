# Angular 17 Dashboard with AG Grid

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Installation

1. Make sure you have Node.js installed (version 18 or higher)
2. Install Angular CLI globally: `npm install -g @angular/cli@17`
3. Install dependencies: `npm install`
4. Start the development server: `ng serve` or `npm start`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features

- Modern Angular 17 with standalone components
- Tailwind CSS for styling
- Responsive dashboard layout
- Interactive charts using ng2-charts
- **Advanced AG Grid data table** with enterprise features
- Lucide icons integration

## AG Grid Features

The entries table now uses AG Grid Angular which provides:

- **Advanced Filtering**: Text, date, number, and set filters with floating filter row
- **Custom Cell Renderers**: Status badges, priority indicators, progress bars, and action dropdowns
- **Column Management**: Resizable, sortable, and pinnable columns
- **Pagination**: Built-in pagination with configurable page sizes (10, 20, 50)
- **Row Selection**: Multiple row selection with checkboxes
- **Performance**: Virtualization for handling large datasets
- **Quick Filter**: Global search across all columns
- **Export Capabilities**: Ready for CSV/Excel export features

## Project Structure

- `src/app/components/navbar/` - Navigation bar component
- `src/app/components/hero-panel/` - Main dashboard panel with charts
- `src/app/components/summary-cards/` - Summary statistics cards
- `src/app/components/entries-table/` - **AG Grid data table** for project entries
- `src/styles.scss` - Global styles and Tailwind configuration

## Angular 17 Features Used

- Standalone components
- New control flow syntax (@if, @for, @switch)
- Modern Angular CLI builder
- TypeScript 5.4 support
- Improved performance optimizations

## AG Grid Customization

The AG Grid table includes:
- Custom cell renderers for status badges with color coding
- Priority indicators with appropriate styling
- Progress bars showing project completion percentage
- Action buttons with dropdown menus
- Theme integration with the existing design system
- Responsive design that works across different screen sizes

## Technologies Used

- Angular 17 with TypeScript
- AG Grid Angular for data tables
- Tailwind CSS for styling
- ng2-charts for data visualization
- Lucide Angular for icons
- Standalone components architecture

## Getting Started

After installation, the dashboard will display:
1. **Navigation Bar**: Logo, menu items, search, and user profile
2. **Hero Panel**: Overview statistics and charts
3. **Summary Cards**: Quick metrics overview
4. **AG Grid Table**: Advanced project entries table with filtering and sorting

The AG Grid table supports:
- Column resizing and reordering
- Advanced filtering (toggle with Filter button)
- Global search
- Row selection
- Custom cell renderers for better data visualization
- Pagination with customizable page sizes
