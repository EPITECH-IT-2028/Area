//
//  ContentView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

import SwiftUI

struct ContentView: View {
	@StateObject private var viewModel = LoginViewModel()

	var body: some View {
		if viewModel.isLoggedIn {
			TabView {
				Tab(Constants.homeString, systemImage: Constants.homeIconString) {
					HomeView()
				}
				Tab(Constants.servicesString, systemImage: Constants.servicesIconString)
				{
					ServicesView()
				}
				Tab(Constants.settingsString, systemImage: Constants.settingsIconString)
				{
					SettingsView()
				}
			}
			.padding()
		} else {
			LoginView(viewModel: viewModel)
		}
	}
}

//struct ContentView: View {
//
//	@StateObject private var viewModel
//
//    var body: some View {
//			LoginView()
//        TabView {
//					Tab(Constants.homeString, systemImage: Constants.homeIconString) {
//						HomeView()
//					}
//					Tab(Constants.servicesString, systemImage: Constants.servicesIconString) {
//						ServicesView()
//					}
//					Tab(Constants.settingsString, systemImage: Constants.settingsIconString) {
//						SettingsView()
//					}
//        }
//        .padding()
//    }
//}

#Preview {
	ContentView()
}
