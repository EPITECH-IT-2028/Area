//
//  ServicesView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 15/01/2026.
//

import SwiftUI

struct ServicesView: View {
	@State private var searchText: String = ""
	@EnvironmentObject var serviceStore: ServiceStore
	@ObservedObject var viewModel: ServicesViewModel
	@State private var navigationPath = NavigationPath()

	var body: some View {
		NavigationStack(path: $navigationPath) {
			VStack {
				ServiceCollectionView(
					searchText: searchText,
					allCards: serviceStore.fromServiceToCardItem(),
					viewModel: viewModel
				)
				.searchable(text: $searchText)
			}
			.navigationTitle(
				LocalizedStringResource.servicesConnectionTitle
			)
		}
	}
}
