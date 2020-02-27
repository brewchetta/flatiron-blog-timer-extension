## Flatiron Blog Timer

This blog timer is meant for use while students are presenting their blogs. Currently this is an unregistered extension which means you must add it manually.

### Firefox Instructions

Clone this repo and navigate to about:debugging in the browser. Choose 'This Firefox' from the sidebar and select 'Load Temporary Add-on...'

Navigate to the repo and choose `manifest.json`. The extension should now be loaded for this session of firefox.

### Chrome Instructions

There is a chrome branch for this extension. Clone down the repo and `git checkout chrome` once you've navigated to the repo.

TODO: Add instructions for loading a temporary chrome extension.

### Using the Extension

When you click on the extension icon, you'll be able to adjust the time for student presentations. The first time is the number of minutes / seconds a student can present without a warning. The grace period is additional time with a more explicit time warning.

The timer is off by default so instructors can peruse blogging sites without the timer. Set the timer to on and determine how long a student has to present.

To utilize, turn on the blog timer and load up each page of student blogs making sure not to tab back into them. A student's timer begins once the student tabs back into their blog. There is an initial disappearing bar at the top followed by a more explicit warning once they're over time.

### Adding Additional Websites

By default, the timer will only show up on Medium. You can add additional websites to the `manifest.json` --> `content_scripts : matches` in order to add them to the app.

![Flatiron](/icons/learn-32x32.png)
