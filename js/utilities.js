/**
 * This class models a ModalWindow (pop up window)
 * */
class ModalWindow {
    /**
     *  Constructs a modal window.
     * */
    constructor() {
        this.container = this.createWindow();
        this.window;
    }

    /**
     *  Creates the window with minimum elements
     * 
     *  This method should be used privately and never called from outside.
     *  @return 
     * */
    createWindow() {
        const container = document.createElement("div");
        const window = document.createElement("div");

        window.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        container.addEventListener("click", (e) => {
            this.hide();
        });

        window.classList.add("container", "column-direction", "modal-window");
        container.classList.add("container", "dimmed-background");

        this.window = window;

        container.append(window);

        return container;
    }

    /**
     *  Adds elements to the window. Order does matter. 
     * 
     *  @param elements - one or more elements to add
     * */
    add(...elements) {
        for (const element of elements) {
            this.window.append(element);
        }
    }

    /**
     *  Binds an element to the modal window 
     * 
     *  @param action - An action for the modal window. "open" and "close" are the only available options1 
     *  @param element - HTML element to be bound. 
     * */
    bind(action, element) {
        element.addEventListener("click", () => {
            switch (action) {
                case "open":
                    this.show();
                    break;

                case "close":
                    this.hide();
                    break;
                
                default:
                    console.log("Invalid Paramater");
            }
        });
    }

    /**
     *  Displays the modal window 
     * */
    show() {
        this.container.classList.add("fade-in"); 
        document.body.prepend(this.container);
    }

    /**
     *  Hides the modal window 
     * */
    hide() {
        this.container.classList.add("fade-out"); 
        setTimeout(() => {
            this.container.classList.remove("fade-out");
            this.container.remove(this.container);
        }, 200);
    }

}

export { ModalWindow }