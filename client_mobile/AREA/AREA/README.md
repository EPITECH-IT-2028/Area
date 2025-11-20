# Client Mobile

---

## Architecture Overview

This project follows the **MVVM (Model-View-ViewModel)** pattern. This approach ensures modular, scalable, and maintainable code.

### MVVM (Model-View-ViewModel)
- **Model**: Contains your app's data structures and business logic. Responsible for managing the data, persistence, and core domain logic.
- **View**: Displays the UI and receives user interactions. Views are kept simple and do not contain business logic.
- **ViewModel**: Acts as a bridge between the Model and the View. It provides data to the View, handles UI logic, and communicates with the Model. ViewModels expose observable properties for the View to react to changes.

**Benefits of MVVM**:
- Separation of concerns for easier maintenance
- Enhanced testability (ViewModels can be tested independently)
- Improved UI flexibility and reusability
