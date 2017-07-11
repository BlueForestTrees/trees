package trees.domain.dto.link;

import lombok.*;
import trees.domain.dto.tree.TrunkDTO;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class RootCreatedDTO {
    private Long id;
    private TrunkDTO root;
}
