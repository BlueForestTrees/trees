package trees.domain.graph;


import lombok.*;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
@ToString
public class Node implements GraphElementBase {
    @GraphId
    private Long id;
    private String name;
    private Double qt;
    private String displayUnit;
    private List<Link> links;
}
