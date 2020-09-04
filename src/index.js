import {ILayoutRestorer} from '@jupyterlab/application';
import {ICommandPalette, MainAreaWidget, WidgetTracker} from '@jupyterlab/apputils';
import {Widget} from '@lumino/widgets';
import Vue from 'vue';
import Server from './Server.vue'


class OpenEOWidget extends Widget {
    /**
     * Construct a new OpenEO widget.
     */
    constructor() {
        super();
    }

    /**
     * Handle update requests for the widget.
     */
    async onUpdateRequest(msg) {
        new Vue({
            el: this.node,
            render: h => h(Server)
        })
    }
}


/**
 * Activate the OpenEO widget extension.
 */
function activate(app, palette, restorer) {
    console.log('JupyterLab extension OpenEO is activated!');

    // Declare a widget variable
    let widget;

    // Add an application command
    const command = 'vue:open';
    app.commands.addCommand(command, {
        label: 'openEO',
        execute: () => {
            if (!widget) {
                // Create a new widget if one does not exist
                const content = new OpenEOWidget();
                widget = new MainAreaWidget({content});
                widget.id = 'openEO';
                widget.title.label = 'openEO';
                widget.title.closable = true;
            }
            if (!tracker.has(widget)) {
                // Track the state of the widget for later restoration
                tracker.add(widget);
            }
            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main');
            }
            widget.content.update();

            // Activate the widget
            app.shell.activateById(widget.id);
        }
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'openEO'});

    // Track and restore the widget state
    let tracker = new WidgetTracker({
        namespace: 'vue'
    });
    restorer.restore(tracker, {
        command,
        name: () => 'vue'
    });
}

/**
 * Initialization data for the jupyterlab_vue extension.
 */
const extension = {
    id: 'openEO',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer],
    activate: activate
};

export default extension;
