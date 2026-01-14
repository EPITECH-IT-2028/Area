//
//  AreaCollectionView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 12/01/2026.
//

internal import Combine
import SwiftUI

struct AreaCollectionView: View {
	@State private var selectedCardIndex: Int? = nil
	@EnvironmentObject var serviceStore: ServiceStore
	@ObservedObject var areaViewModel: AreaCreationViewModel
	@Binding var navigationPath: NavigationPath

	var serviceName: String?
	var searchText: String
	var allCards: [CardItem]
	var isAction: Bool

	var body: some View {
		Group {
			if let serviceName = serviceName {
				let filteredCards =
					searchText.isEmpty
					? allCards
					: allCards.filter { card in
						card.title.localizedCaseInsensitiveContains(searchText)
					}

				ScrollView {
					if filteredCards.isEmpty {
						VStack(spacing: 20) {
							Image(systemName: "tray")
								.font(.system(size: 50))
								.foregroundStyle(.gray)
							Text(
								searchText.isEmpty
									? (isAction
										? LocalizedStringResource.actionsNoActionsTitle
										: LocalizedStringResource.reactionsNoReactionsTitle)
									: LocalizedStringResource.actionsNoResultTitle
							)
							.font(.headline)
							.foregroundStyle(.gray)
						}
						.frame(maxWidth: .infinity, maxHeight: .infinity)
						.padding(.top, 50)
					} else {
						VStack(spacing: 20) {
							ForEach(filteredCards) { card in
								if let service = serviceStore.services.first(where: {
									$0.name == serviceName
								}) {

									if isAction,
										let action = service.actions.first(where: {
											$0.name == card.title
										})
									{
										NavigationLink(
											destination: ActionConfigView(
												action: action,
												viewModel: areaViewModel,
												navigationPath: $navigationPath
											)
										) {
											TableView(item: card)
										}
									} else if !isAction,
										let reaction = service.reactions.first(where: {
											$0.name == card.title
										})
									{
										NavigationLink(
											destination: ReactionConfigView(
												reaction: reaction,
												viewModel: areaViewModel,
												navigationPath: $navigationPath
											)
										) {
											TableView(item: card)
										}
									}
								}
							}
						}
						.padding()
					}
				}
			} else {
				EmptyView()
			}
		}
		.navigationTitle(LocalizedStringResource.actionsTitle)
		.background(Color(UIColor.systemGroupedBackground))
	}
}
