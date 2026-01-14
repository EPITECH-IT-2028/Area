//
//  ServicesView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import SwiftUI

struct ServicesView: View {
	@State private var searchText: String = ""
	@EnvironmentObject var serviceStore: ServiceStore
	@StateObject private var viewModel = AreaCreationViewModel()
	@State private var navigationPath = NavigationPath()

	var body: some View {
		NavigationStack(path: $navigationPath) {
			VStack {
				if let action = viewModel.selectedAction {
					HStack {
						Image(systemName: "checkmark.circle.fill")
							.foregroundColor(.green)
						Text("\(LocalizedStringResource.actionsTitle): \(action.name)")
							.font(.caption)
							.foregroundColor(.secondary)
					}
					.padding(.horizontal)
					.padding(.top, 8)
				}

				CollectionView(
					viewModel: viewModel,
					searchText: searchText,
					allCards: serviceStore.fromServiceToCardItem(),
					isAction: viewModel.selectedAction == nil
				)
				.searchable(text: $searchText)
			}
			.navigationTitle(
				viewModel.selectedAction == nil
					? LocalizedStringResource.servicesTitle
					: LocalizedStringResource.areaCreationChooseReactionTitle
			)
			.navigationDestination(for: Service.self) { service in
				if viewModel.selectedAction == nil {
					ActionsView(
						service: service,
						viewModel: viewModel,
						navigationPath: $navigationPath
					)
				} else {
					ReactionsView(
						service: service,
						viewModel: viewModel,
						navigationPath: $navigationPath
					)
				}
			}
		}
	}
}
